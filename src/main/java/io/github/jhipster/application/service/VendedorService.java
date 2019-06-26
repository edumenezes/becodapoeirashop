package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Vendedor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Vendedor}.
 */
public interface VendedorService {

    /**
     * Save a vendedor.
     *
     * @param vendedor the entity to save.
     * @return the persisted entity.
     */
    Vendedor save(Vendedor vendedor);

    /**
     * Get all the vendedors.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Vendedor> findAll(Pageable pageable);


    /**
     * Get the "id" vendedor.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Vendedor> findOne(Long id);

    /**
     * Delete the "id" vendedor.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
