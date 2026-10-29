
package com.backend.backend.service;

import org.springframework.stereotype.Service;
import com.google.genai.Client;
import com.google.genai.gaos.models.interactions.CreateModelInteraction;
import com.google.genai.gaos.models.interactions.Interaction;
import com.google.genai.gaos.models.interactions.InteractionsInput;
import com.google.genai.gaos.models.interactions.Model;
import com.google.genai.gaos.models.operations.CreateInteractionRequestBody;

@Service
public class GeminiService {

    private final Client client = new Client();

    public String getResponse(String message) {

        System.out.println("Wysyłam pytanie do Gemini...");

        CreateModelInteraction params =
                CreateModelInteraction.builder()
                        .model(Model.of("gemini-3.5-flash"))
                        .input(InteractionsInput.of(message))
                        .build();

        Interaction interaction = client.interactions
                .create(CreateInteractionRequestBody.of(params))
                .interaction()
                .orElseThrow();

        System.out.println("Otrzymałem odpowiedź Gemini!");

        return interaction.outputText().orElse("Brak odpowiedzi");
    }
}
