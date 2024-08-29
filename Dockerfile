FROM ubuntu:24.04
SHELL ["/bin/bash", "-c"]
RUN apt update && apt upgrade -y
RUN apt install -y curl xz-utils wget
RUN curl --proto '=https' --tlsv1.2 -LsSf https://github.com/nbittich/adana/releases/download/0.18.2/adana-installer.sh | sh
RUN source $HOME/.cargo/env

WORKDIR /adana
RUN mkdir -p adana-std
RUN wget -P /tmp https://github.com/nbittich/adana-std/releases/download/0.18.2/adana-std.tar.gz
RUN tar xvzf /tmp/adana-std.tar.gz -C /adana/adana-std

WORKDIR /app
COPY server.adana server.adana
COPY public public

CMD ["/root/.cargo/bin/adana", "-slp","/adana", "-sp", "server.adana", "-d"]
