package com.example.devsecops_demo.Dtos;

import lombok.Builder;

@Builder
public record AlternativeDto(
        String id,
        String name,
        String description,
        String website,
        LogoDto logo
) {
}
