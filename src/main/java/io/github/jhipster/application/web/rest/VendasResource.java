package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.domain.Vendas;
import io.github.jhipster.application.service.VendasService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.jhipster.application.domain.Vendas}.
 */
@RestController
@RequestMapping("/api")
public class VendasResource {

    private final Logger log = LoggerFactory.getLogger(VendasResource.class);

    private static final String ENTITY_NAME = "vendas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VendasService vendasService;

    public VendasResource(VendasService vendasService) {
        this.vendasService = vendasService;
    }

    /**
     * {@code POST  /vendas} : Create a new vendas.
     *
     * @param vendas the vendas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vendas, or with status {@code 400 (Bad Request)} if the vendas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vendas")
    public ResponseEntity<Vendas> createVendas(@RequestBody Vendas vendas) throws URISyntaxException {
        log.debug("REST request to save Vendas : {}", vendas);
        if (vendas.getId() != null) {
            throw new BadRequestAlertException("A new vendas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vendas result = vendasService.save(vendas);
        return ResponseEntity.created(new URI("/api/vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vendas} : Updates an existing vendas.
     *
     * @param vendas the vendas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vendas,
     * or with status {@code 400 (Bad Request)} if the vendas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vendas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vendas")
    public ResponseEntity<Vendas> updateVendas(@RequestBody Vendas vendas) throws URISyntaxException {
        log.debug("REST request to update Vendas : {}", vendas);
        if (vendas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vendas result = vendasService.save(vendas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vendas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vendas} : get all the vendas.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vendas in body.
     */
    @GetMapping("/vendas")
    public ResponseEntity<List<Vendas>> getAllVendas(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Vendas");
        Page<Vendas> page = vendasService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /vendas/:id} : get the "id" vendas.
     *
     * @param id the id of the vendas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vendas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vendas/{id}")
    public ResponseEntity<Vendas> getVendas(@PathVariable Long id) {
        log.debug("REST request to get Vendas : {}", id);
        Optional<Vendas> vendas = vendasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vendas);
    }

    /**
     * {@code DELETE  /vendas/:id} : delete the "id" vendas.
     *
     * @param id the id of the vendas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vendas/{id}")
    public ResponseEntity<Void> deleteVendas(@PathVariable Long id) {
        log.debug("REST request to delete Vendas : {}", id);
        vendasService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
