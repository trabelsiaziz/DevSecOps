FROM eclipse-temurin:21-jre-jammy AS final

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

USER appuser

WORKDIR /app

COPY --from=extract /build/target/extracted/dependencies/ ./dependencies/
COPY --from=extract /build/target/extracted/spring-boot-loader/ ./spring-boot-loader/
COPY --from=extract /build/target/extracted/snapshot-dependencies/ ./snapshot-dependencies/
COPY --from=extract /build/target/extracted/application/ ./application/

EXPOSE 8080

ENTRYPOINT [ "java", "org.springframework.boot.loader.launch.JarLauncher" ]
