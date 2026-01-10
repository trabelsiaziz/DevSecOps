package com.example.devsecops_demo;

import com.example.devsecops_demo.Dtos.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class Controller {
    private final AppService service;


    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Service is up and running!");
    }

    @GetMapping("/boycott")
    public ResponseEntity<ApiResponse> getBoycottData(
            @RequestParam String keyword
    ) {
        return ResponseEntity.ok(service.getBoycottData(keyword));

    }
}
