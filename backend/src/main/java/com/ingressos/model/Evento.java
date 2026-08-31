package com.ingressos.model;

import java.math.BigDecimal;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

public class Evento {
    private String id;
    private String descricao;
    private String tipo;
    private BigDecimal preco;
    private AtomicInteger ingressosDisponiveis;

    public Evento() {}

    public Evento(String descricao, String tipo, BigDecimal preco, int ingressosDisponiveis) {
        this.id = UUID.randomUUID().toString();
        this.descricao = descricao;
        this.tipo = tipo;
        this.preco = preco;
        this.ingressosDisponiveis = new AtomicInteger(ingressosDisponiveis);
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public int getIngressosDisponiveis() { 
        return ingressosDisponiveis != null ? ingressosDisponiveis.get() : 0; 
    }
    
    public void setIngressosDisponiveis(int ingressosDisponiveis) { 
        if (this.ingressosDisponiveis == null) {
            this.ingressosDisponiveis = new AtomicInteger(ingressosDisponiveis);
        } else {
            this.ingressosDisponiveis.set(ingressosDisponiveis); 
        }
    }

    public boolean decrementarIngresso() {
        if (this.ingressosDisponiveis == null) return false;
        while (true) {
            int atual = ingressosDisponiveis.get();
            if (atual <= 0) return false;
            if (ingressosDisponiveis.compareAndSet(atual, atual - 1)) return true;
        }
    }

    public void incrementarIngresso() {
        if (this.ingressosDisponiveis != null) {
            this.ingressosDisponiveis.incrementAndGet();
        }
    }
}