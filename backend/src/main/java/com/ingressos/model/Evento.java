package com.ingressos.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eventos")
public class Evento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "vendedor_id")
    private Long vendedorId;
    private String titulo;
    private String descricao;
    @Column(name = "tipo_evento")
    private String tipoEvento;
    @Column(name = "data_evento")
    private LocalDateTime dataEvento;

    public Evento() {
    }

    public Evento(Long vendedorId, String titulo, String descricao, String tipoEvento, LocalDateTime dataEvento) {
        this.vendedorId = vendedorId;
        this.titulo = titulo;
        this.descricao = descricao;
        this.tipoEvento = tipoEvento;
        this.dataEvento = dataEvento;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getVendedorId() { return vendedorId; }
    public void setVendedorId(Long vendedorId) { this.vendedorId = vendedorId; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getTipoEvento() { return tipoEvento; }
    public void setTipoEvento(String tipoEvento) { this.tipoEvento = tipoEvento; }
    public LocalDateTime getDataEvento() { return dataEvento; }
    public void setDataEvento(LocalDateTime dataEvento) { this.dataEvento = dataEvento; }
}