package pe.com.cd.web.rest;
import pe.com.cd.domain.DepositoCambista;
import pe.com.cd.service.DepositoCambistaService;
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
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing DepositoCambista.
 */
@RestController
@RequestMapping("/api")
public class DepositoCambistaResource {

    private final Logger log = LoggerFactory.getLogger(DepositoCambistaResource.class);

    private static final String ENTITY_NAME = "depositoCambista";

    private final DepositoCambistaService depositoCambistaService;

    public DepositoCambistaResource(DepositoCambistaService depositoCambistaService) {
        this.depositoCambistaService = depositoCambistaService;
    }

    /**
     * POST  /deposito-cambistas : Create a new depositoCambista.
     *
     * @param depositoCambista the depositoCambista to create
     * @return the ResponseEntity with status 201 (Created) and with body the new depositoCambista, or with status 400 (Bad Request) if the depositoCambista has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deposito-cambistas")
    public ResponseEntity<DepositoCambista> createDepositoCambista(@RequestBody DepositoCambista depositoCambista) throws URISyntaxException {
        log.debug("REST request to save DepositoCambista : {}", depositoCambista);
        if (depositoCambista.getId() != null) {
            throw new BadRequestAlertException("A new depositoCambista cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepositoCambista result = depositoCambistaService.save(depositoCambista);
        return ResponseEntity.created(new URI("/api/deposito-cambistas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deposito-cambistas : Updates an existing depositoCambista.
     *
     * @param depositoCambista the depositoCambista to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated depositoCambista,
     * or with status 400 (Bad Request) if the depositoCambista is not valid,
     * or with status 500 (Internal Server Error) if the depositoCambista couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deposito-cambistas")
    public ResponseEntity<DepositoCambista> updateDepositoCambista(@RequestBody DepositoCambista depositoCambista) throws URISyntaxException {
        log.debug("REST request to update DepositoCambista : {}", depositoCambista);
        if (depositoCambista.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DepositoCambista result = depositoCambistaService.save(depositoCambista);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, depositoCambista.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deposito-cambistas : get all the depositoCambistas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of depositoCambistas in body
     */
    @GetMapping("/deposito-cambistas")
    public List<DepositoCambista> getAllDepositoCambistas() {
        log.debug("REST request to get all DepositoCambistas");
        return depositoCambistaService.findAll();
    }

    /**
     * GET  /deposito-cambistas/:id : get the "id" depositoCambista.
     *
     * @param id the id of the depositoCambista to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depositoCambista, or with status 404 (Not Found)
     */
    @GetMapping("/deposito-cambistas/{id}")
    public ResponseEntity<DepositoCambista> getDepositoCambista(@PathVariable Long id) {
        log.debug("REST request to get DepositoCambista : {}", id);
        Optional<DepositoCambista> depositoCambista = depositoCambistaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(depositoCambista);
    }

    /**
     * DELETE  /deposito-cambistas/:id : delete the "id" depositoCambista.
     *
     * @param id the id of the depositoCambista to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deposito-cambistas/{id}")
    public ResponseEntity<Void> deleteDepositoCambista(@PathVariable Long id) {
        log.debug("REST request to delete DepositoCambista : {}", id);
        depositoCambistaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/deposito-cambistas?query=:query : search for the depositoCambista corresponding
     * to the query.
     *
     * @param query the query of the depositoCambista search
     * @return the result of the search
     */
    @GetMapping("/_search/deposito-cambistas")
    public List<DepositoCambista> searchDepositoCambistas(@RequestParam String query) {
        log.debug("REST request to search DepositoCambistas for query {}", query);
        return depositoCambistaService.search(query);
    }

}
