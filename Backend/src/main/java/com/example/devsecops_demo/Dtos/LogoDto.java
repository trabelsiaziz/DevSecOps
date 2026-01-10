package com.example.devsecops_demo.Dtos;

import lombok.Builder;

@Builder
public record LogoDto(
        String type,
        String url
) {
}
