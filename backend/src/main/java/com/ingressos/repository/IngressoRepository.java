// src/main/java/com/ingressos/repository/IngressoRepository.java
package com.ingressos.repository;

import com.ingressos.model.IngressoComprado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IngressoRepository extends JpaRepository<IngressoComprado, Long> {
    List<IngressoComprado> findByCompradorId(Long compradorId);
}