package pe.com.cd.web.rest;
import pe.com.cd.domain.DepositoPersona;
import pe.com.cd.service.DepositoPersonaService;
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
 * REST controller for managing DepositoPersona.
 */
@RestController
@RequestMapping("/api")
public class DepositoPersonaResource {

    private final Logger log = LoggerFactory.getLogger(DepositoPersonaResource.class);

    private static final String ENTITY_NAME = "depositoPersona";

    private final DepositoPersonaService depositoPersonaService;

    public DepositoPersonaResource(DepositoPersonaService depositoPersonaService) {
        this.depositoPersonaService = depositoPersonaService;
    }

    /**
     * POST  /deposito-personas : Create a new depositoPersona.
     *
     * @param depositoPersona the depositoPersona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new depositoPersona, or with status 400 (Bad Request) if the depositoPersona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/deposito-personas")
    public ResponseEntity<DepositoPersona> createDepositoPersona(@RequestBody DepositoPersona depositoPersona) throws URISyntaxException {
        log.debug("REST request to save DepositoPersona : {}", depositoPersona);
        if (depositoPersona.getId() != null) {
            throw new BadRequestAlertException("A new depositoPersona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepositoPersona result = depositoPersonaService.save(depositoPersona);
        return ResponseEntity.created(new URI("/api/deposito-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /deposito-personas : Updates an existing depositoPersona.
     *
     * @param depositoPersona the depositoPersona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated depositoPersona,
     * or with status 400 (Bad Request) if the depositoPersona is not valid,
     * or with status 500 (Internal Server Error) if the depositoPersona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/deposito-personas")
    public ResponseEntity<DepositoPersona> updateDepositoPersona(@RequestBody DepositoPersona depositoPersona) throws URISyntaxException {
        log.debug("REST request to update DepositoPersona : {}", depositoPersona);
        if (depositoPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DepositoPersona result = depositoPersonaService.save(depositoPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, depositoPersona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /deposito-personas : get all the depositoPersonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of depositoPersonas in body
     */
    @GetMapping("/deposito-personas")
    public List<DepositoPersona> getAllDepositoPersonas() {
        log.debug("REST request to get all DepositoPersonas");
        return depositoPersonaService.findAll();
    }

    /**
     * GET  /deposito-personas/:id : get the "id" depositoPersona.
     *
     * @param id the id of the depositoPersona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depositoPersona, or with status 404 (Not Found)
     */
    @GetMapping("/deposito-personas/{id}")
    public ResponseEntity<DepositoPersona> getDepositoPersona(@PathVariable Long id) {
        log.debug("REST request to get DepositoPersona : {}", id);
        Optional<DepositoPersona> depositoPersona = depositoPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(depositoPersona);
    }

    /**
     * DELETE  /deposito-personas/:id : delete the "id" depositoPersona.
     *
     * @param id the id of the depositoPersona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/deposito-personas/{id}")
    public ResponseEntity<Void> deleteDepositoPersona(@PathVariable Long id) {
        log.debug("REST request to delete DepositoPersona : {}", id);
        depositoPersonaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/deposito-personas?query=:query : search for the depositoPersona corresponding
     * to the query.
     *
     * @param query the query of the depositoPersona search
     * @return the result of the search
     */
    @GetMapping("/_search/deposito-personas")
    public List<DepositoPersona> searchDepositoPersonas(@RequestParam String query) {
        log.debug("REST request to search DepositoPersonas for query {}", query);
        return depositoPersonaService.search(query);
    }

}
