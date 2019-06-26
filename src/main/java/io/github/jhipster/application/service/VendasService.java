package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Vendas;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Vendas}.
 */
public interface VendasService {

    /**
     * Save a vendas.
     *
     * @param vendas the entity to save.
     * @return the persisted entity.
     */
    Vendas save(Vendas vendas);

    /**
     * Get all the vendas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Vendas> findAll(Pageable pageable);


    /**
     * Get the "id" vendas.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Vendas> findOne(Long id);

    /**
     * Delete the "id" vendas.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
