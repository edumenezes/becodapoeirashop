package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Vendas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vendas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendasRepository extends JpaRepository<Vendas, Long> {

}
