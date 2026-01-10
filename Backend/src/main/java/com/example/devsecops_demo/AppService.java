package com.example.devsecops_demo;

import com.example.devsecops_demo.Dtos.ApiResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AppService {

    private final WebClient boycottWebClient;

    public ApiResponse getBoycottData(@NonNull String keyword) {
        return boycottWebClient.get()
                .uri(uri -> uri
                        .path("/{keyword}")
                        .queryParam("limit", 4)
                        .queryParam("offset", 0)
                        .build(keyword))
                .retrieve()
                .bodyToMono(ApiResponse.class)
                .onErrorResume(WebClientResponseException.NotFound.class,
                        ex -> reactor.core.publisher.Mono.just(new ApiResponse(404, "NOT FOUND", List.of())))
                .block(java.time.Duration.ofSeconds(10));
    }

}
