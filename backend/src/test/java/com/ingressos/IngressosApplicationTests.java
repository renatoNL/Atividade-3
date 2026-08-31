package com.ingressos;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class IngressosApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void deveCriarEventoComDadosValidos() throws Exception {
        mockMvc.perform(post("/admin/eventos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"descricao\":\"Evento teste\",\"tipo\":\"SHOW\",\"preco\":100.00,\"ingressosDisponiveis\":10}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.descricao").value("Evento teste"));
    }
}
