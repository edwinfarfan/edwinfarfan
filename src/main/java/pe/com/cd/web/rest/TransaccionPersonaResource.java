package pe.com.cd.web.rest;
import pe.com.cd.domain.TransaccionPersona;
import pe.com.cd.service.TransaccionPersonaService;
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
 * REST controller for managing TransaccionPersona.
 */
@RestController
@RequestMapping("/api")
public class TransaccionPersonaResource {

    private final Logger log = LoggerFactory.getLogger(TransaccionPersonaResource.class);

    private static final String ENTITY_NAME = "transaccionPersona";

    private final TransaccionPersonaService transaccionPersonaService;

    public TransaccionPersonaResource(TransaccionPersonaService transaccionPersonaService) {
        this.transaccionPersonaService = transaccionPersonaService;
    }

    /**
     * POST  /transaccion-personas : Create a new transaccionPersona.
     *
     * @param transaccionPersona the transaccionPersona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transaccionPersona, or with status 400 (Bad Request) if the transaccionPersona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaccion-personas")
    public ResponseEntity<TransaccionPersona> createTransaccionPersona(@RequestBody TransaccionPersona transaccionPersona) throws URISyntaxException {
        log.debug("REST request to save TransaccionPersona : {}", transaccionPersona);
        if (transaccionPersona.getId() != null) {
            throw new BadRequestAlertException("A new transaccionPersona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransaccionPersona result = transaccionPersonaService.save(transaccionPersona);
        return ResponseEntity.created(new URI("/api/transaccion-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaccion-personas : Updates an existing transaccionPersona.
     *
     * @param transaccionPersona the transaccionPersona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transaccionPersona,
     * or with status 400 (Bad Request) if the transaccionPersona is not valid,
     * or with status 500 (Internal Server Error) if the transaccionPersona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaccion-personas")
    public ResponseEntity<TransaccionPersona> updateTransaccionPersona(@RequestBody TransaccionPersona transaccionPersona) throws URISyntaxException {
        log.debug("REST request to update TransaccionPersona : {}", transaccionPersona);
        if (transaccionPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransaccionPersona result = transaccionPersonaService.save(transaccionPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transaccionPersona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaccion-personas : get all the transaccionPersonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transaccionPersonas in body
     */
    @GetMapping("/transaccion-personas")
    public List<TransaccionPersona> getAllTransaccionPersonas() {
        log.debug("REST request to get all TransaccionPersonas");
        return transaccionPersonaService.findAll();
    }

    /**
     * GET  /transaccion-personas/:id : get the "id" transaccionPersona.
     *
     * @param id the id of the transaccionPersona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transaccionPersona, or with status 404 (Not Found)
     */
    @GetMapping("/transaccion-personas/{id}")
    public ResponseEntity<TransaccionPersona> getTransaccionPersona(@PathVariable Long id) {
        log.debug("REST request to get TransaccionPersona : {}", id);
        Optional<TransaccionPersona> transaccionPersona = transaccionPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transaccionPersona);
    }

    /**
     * DELETE  /transaccion-personas/:id : delete the "id" transaccionPersona.
     *
     * @param id the id of the transaccionPersona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaccion-personas/{id}")
    public ResponseEntity<Void> deleteTransaccionPersona(@PathVariable Long id) {
        log.debug("REST request to delete TransaccionPersona : {}", id);
        transaccionPersonaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/transaccion-personas?query=:query : search for the transaccionPersona corresponding
     * to the query.
     *
     * @param query the query of the transaccionPersona search
     * @return the result of the search
     */
    @GetMapping("/_search/transaccion-personas")
    public List<TransaccionPersona> searchTransaccionPersonas(@RequestParam String query) {
        log.debug("REST request to search TransaccionPersonas for query {}", query);
        return transaccionPersonaService.search(query);
    }

}
