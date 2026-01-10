package com.example.devsecops_demo.Dtos;

import lombok.Builder;

import java.util.List;
@Builder
public record BrandDto(
        String id,
        String name,
        String description,
        String type,
        String website,
        LogoDto logo,
        List<CategoryDto> categories,
        List<AlternativeDto> alternatives
) {
}
