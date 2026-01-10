package com.example.devsecops_demo.Dtos;

import lombok.Builder;

@Builder
public record CategoryDto(
        String id,
        String name,
        String slug
) {
}
