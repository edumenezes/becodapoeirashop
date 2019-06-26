package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.VendasService;
import io.github.jhipster.application.domain.Vendas;
import io.github.jhipster.application.repository.VendasRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Vendas}.
 */
@Service
@Transactional
public class VendasServiceImpl implements VendasService {

    private final Logger log = LoggerFactory.getLogger(VendasServiceImpl.class);

    private final VendasRepository vendasRepository;

    public VendasServiceImpl(VendasRepository vendasRepository) {
        this.vendasRepository = vendasRepository;
    }

    /**
     * Save a vendas.
     *
     * @param vendas the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Vendas save(Vendas vendas) {
        log.debug("Request to save Vendas : {}", vendas);
        return vendasRepository.save(vendas);
    }

    /**
     * Get all the vendas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Vendas> findAll(Pageable pageable) {
        log.debug("Request to get all Vendas");
        return vendasRepository.findAll(pageable);
    }


    /**
     * Get one vendas by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Vendas> findOne(Long id) {
        log.debug("Request to get Vendas : {}", id);
        return vendasRepository.findById(id);
    }

    /**
     * Delete the vendas by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Vendas : {}", id);
        vendasRepository.deleteById(id);
    }
}
