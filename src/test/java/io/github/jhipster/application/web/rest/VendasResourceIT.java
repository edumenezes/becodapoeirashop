package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.BecodapoeirashopApp;
import io.github.jhipster.application.domain.Vendas;
import io.github.jhipster.application.repository.VendasRepository;
import io.github.jhipster.application.service.VendasService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link VendasResource} REST controller.
 */
@SpringBootTest(classes = BecodapoeirashopApp.class)
public class VendasResourceIT {

    private static final String DEFAULT_COUNTRY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_NAME = "BBBBBBBBBB";

    @Autowired
    private VendasRepository vendasRepository;

    @Autowired
    private VendasService vendasService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVendasMockMvc;

    private Vendas vendas;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VendasResource vendasResource = new VendasResource(vendasService);
        this.restVendasMockMvc = MockMvcBuilders.standaloneSetup(vendasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vendas createEntity(EntityManager em) {
        Vendas vendas = new Vendas()
            .countryName(DEFAULT_COUNTRY_NAME);
        return vendas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vendas createUpdatedEntity(EntityManager em) {
        Vendas vendas = new Vendas()
            .countryName(UPDATED_COUNTRY_NAME);
        return vendas;
    }

    @BeforeEach
    public void initTest() {
        vendas = createEntity(em);
    }

    @Test
    @Transactional
    public void createVendas() throws Exception {
        int databaseSizeBeforeCreate = vendasRepository.findAll().size();

        // Create the Vendas
        restVendasMockMvc.perform(post("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendas)))
            .andExpect(status().isCreated());

        // Validate the Vendas in the database
        List<Vendas> vendasList = vendasRepository.findAll();
        assertThat(vendasList).hasSize(databaseSizeBeforeCreate + 1);
        Vendas testVendas = vendasList.get(vendasList.size() - 1);
        assertThat(testVendas.getCountryName()).isEqualTo(DEFAULT_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void createVendasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vendasRepository.findAll().size();

        // Create the Vendas with an existing ID
        vendas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendasMockMvc.perform(post("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendas)))
            .andExpect(status().isBadRequest());

        // Validate the Vendas in the database
        List<Vendas> vendasList = vendasRepository.findAll();
        assertThat(vendasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVendas() throws Exception {
        // Initialize the database
        vendasRepository.saveAndFlush(vendas);

        // Get all the vendasList
        restVendasMockMvc.perform(get("/api/vendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendas.getId().intValue())))
            .andExpect(jsonPath("$.[*].countryName").value(hasItem(DEFAULT_COUNTRY_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getVendas() throws Exception {
        // Initialize the database
        vendasRepository.saveAndFlush(vendas);

        // Get the vendas
        restVendasMockMvc.perform(get("/api/vendas/{id}", vendas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vendas.getId().intValue()))
            .andExpect(jsonPath("$.countryName").value(DEFAULT_COUNTRY_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVendas() throws Exception {
        // Get the vendas
        restVendasMockMvc.perform(get("/api/vendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVendas() throws Exception {
        // Initialize the database
        vendasService.save(vendas);

        int databaseSizeBeforeUpdate = vendasRepository.findAll().size();

        // Update the vendas
        Vendas updatedVendas = vendasRepository.findById(vendas.getId()).get();
        // Disconnect from session so that the updates on updatedVendas are not directly saved in db
        em.detach(updatedVendas);
        updatedVendas
            .countryName(UPDATED_COUNTRY_NAME);

        restVendasMockMvc.perform(put("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVendas)))
            .andExpect(status().isOk());

        // Validate the Vendas in the database
        List<Vendas> vendasList = vendasRepository.findAll();
        assertThat(vendasList).hasSize(databaseSizeBeforeUpdate);
        Vendas testVendas = vendasList.get(vendasList.size() - 1);
        assertThat(testVendas.getCountryName()).isEqualTo(UPDATED_COUNTRY_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingVendas() throws Exception {
        int databaseSizeBeforeUpdate = vendasRepository.findAll().size();

        // Create the Vendas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendasMockMvc.perform(put("/api/vendas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vendas)))
            .andExpect(status().isBadRequest());

        // Validate the Vendas in the database
        List<Vendas> vendasList = vendasRepository.findAll();
        assertThat(vendasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVendas() throws Exception {
        // Initialize the database
        vendasService.save(vendas);

        int databaseSizeBeforeDelete = vendasRepository.findAll().size();

        // Delete the vendas
        restVendasMockMvc.perform(delete("/api/vendas/{id}", vendas.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Vendas> vendasList = vendasRepository.findAll();
        assertThat(vendasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vendas.class);
        Vendas vendas1 = new Vendas();
        vendas1.setId(1L);
        Vendas vendas2 = new Vendas();
        vendas2.setId(vendas1.getId());
        assertThat(vendas1).isEqualTo(vendas2);
        vendas2.setId(2L);
        assertThat(vendas1).isNotEqualTo(vendas2);
        vendas1.setId(null);
        assertThat(vendas1).isNotEqualTo(vendas2);
    }
}
