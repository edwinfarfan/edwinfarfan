package pe.com.cd.web.rest;
import pe.com.cd.domain.CuentaBancaria;
import pe.com.cd.repository.CuentaBancariaRepository;
import pe.com.cd.repository.search.CuentaBancariaSearchRepository;
import pe.com.cd.web.rest.errors.BadRequestAlertException;
import pe.com.cd.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing CuentaBancaria.
 */
@RestController
@RequestMapping("/api")
public class CuentaBancariaResource {

    private final Logger log = LoggerFactory.getLogger(CuentaBancariaResource.class);

    private static final String ENTITY_NAME = "cuentaBancaria";

    private final CuentaBancariaRepository cuentaBancariaRepository;

    private final CuentaBancariaSearchRepository cuentaBancariaSearchRepository;

    public CuentaBancariaResource(CuentaBancariaRepository cuentaBancariaRepository, CuentaBancariaSearchRepository cuentaBancariaSearchRepository) {
        this.cuentaBancariaRepository = cuentaBancariaRepository;
        this.cuentaBancariaSearchRepository = cuentaBancariaSearchRepository;
    }

    /**
     * POST  /cuenta-bancarias : Create a new cuentaBancaria.
     *
     * @param cuentaBancaria the cuentaBancaria to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cuentaBancaria, or with status 400 (Bad Request) if the cuentaBancaria has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cuenta-bancarias")
    public ResponseEntity<CuentaBancaria> createCuentaBancaria(@RequestBody CuentaBancaria cuentaBancaria) throws URISyntaxException {
        log.debug("REST request to save CuentaBancaria : {}", cuentaBancaria);
        if (cuentaBancaria.getId() != null) {
            throw new BadRequestAlertException("A new cuentaBancaria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CuentaBancaria result = cuentaBancariaRepository.save(cuentaBancaria);
        cuentaBancariaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/cuenta-bancarias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cuenta-bancarias : Updates an existing cuentaBancaria.
     *
     * @param cuentaBancaria the cuentaBancaria to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cuentaBancaria,
     * or with status 400 (Bad Request) if the cuentaBancaria is not valid,
     * or with status 500 (Internal Server Error) if the cuentaBancaria couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cuenta-bancarias")
    public ResponseEntity<CuentaBancaria> updateCuentaBancaria(@RequestBody CuentaBancaria cuentaBancaria) throws URISyntaxException {
        log.debug("REST request to update CuentaBancaria : {}", cuentaBancaria);
        if (cuentaBancaria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CuentaBancaria result = cuentaBancariaRepository.save(cuentaBancaria);
        cuentaBancariaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cuentaBancaria.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cuenta-bancarias : get all the cuentaBancarias.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cuentaBancarias in body
     */
    @GetMapping("/cuenta-bancarias")
    public List<CuentaBancaria> getAllCuentaBancarias() {
        log.debug("REST request to get all CuentaBancarias");
        return cuentaBancariaRepository.findAll();
    }

    /**
     * GET  /cuenta-bancarias/:id : get the "id" cuentaBancaria.
     *
     * @param id the id of the cuentaBancaria to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cuentaBancaria, or with status 404 (Not Found)
     */
    @GetMapping("/cuenta-bancarias/{id}")
    public ResponseEntity<CuentaBancaria> getCuentaBancaria(@PathVariable Long id) {
        log.debug("REST request to get CuentaBancaria : {}", id);
        Optional<CuentaBancaria> cuentaBancaria = cuentaBancariaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cuentaBancaria);
    }

    /**
     * DELETE  /cuenta-bancarias/:id : delete the "id" cuentaBancaria.
     *
     * @param id the id of the cuentaBancaria to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cuenta-bancarias/{id}")
    public ResponseEntity<Void> deleteCuentaBancaria(@PathVariable Long id) {
        log.debug("REST request to delete CuentaBancaria : {}", id);
        cuentaBancariaRepository.deleteById(id);
        cuentaBancariaSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/cuenta-bancarias?query=:query : search for the cuentaBancaria corresponding
     * to the query.
     *
     * @param query the query of the cuentaBancaria search
     * @return the result of the search
     */
    @GetMapping("/_search/cuenta-bancarias")
    public List<CuentaBancaria> searchCuentaBancarias(@RequestParam String query) {
        log.debug("REST request to search CuentaBancarias for query {}", query);
        return StreamSupport
            .stream(cuentaBancariaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
