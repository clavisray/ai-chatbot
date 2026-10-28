package com.backend.backend.controller;


import com.backend.backend.dto.ChatRequest;
import com.backend.backend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gemini")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService){
        this.geminiService = geminiService;
    }

    @PostMapping
    public String geminiChat(@RequestBody ChatRequest request) {
        return geminiService.getResponse(request.message());
    }


}
