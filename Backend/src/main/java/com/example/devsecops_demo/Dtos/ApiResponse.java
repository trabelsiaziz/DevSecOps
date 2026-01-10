package com.example.devsecops_demo.Dtos;

import lombok.Builder;

import java.util.List;

@Builder
public record ApiResponse(
        int code,
        String status,
        List<BrandDto> data
) {}
