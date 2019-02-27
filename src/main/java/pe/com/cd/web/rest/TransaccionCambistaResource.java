package pe.com.cd.web.rest;
import pe.com.cd.domain.TransaccionCambista;
import pe.com.cd.service.TransaccionCambistaService;
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
 * REST controller for managing TransaccionCambista.
 */
@RestController
@RequestMapping("/api")
public class TransaccionCambistaResource {

    private final Logger log = LoggerFactory.getLogger(TransaccionCambistaResource.class);

    private static final String ENTITY_NAME = "transaccionCambista";

    private final TransaccionCambistaService transaccionCambistaService;

    public TransaccionCambistaResource(TransaccionCambistaService transaccionCambistaService) {
        this.transaccionCambistaService = transaccionCambistaService;
    }

    /**
     * POST  /transaccion-cambistas : Create a new transaccionCambista.
     *
     * @param transaccionCambista the transaccionCambista to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transaccionCambista, or with status 400 (Bad Request) if the transaccionCambista has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transaccion-cambistas")
    public ResponseEntity<TransaccionCambista> createTransaccionCambista(@RequestBody TransaccionCambista transaccionCambista) throws URISyntaxException {
        log.debug("REST request to save TransaccionCambista : {}", transaccionCambista);
        if (transaccionCambista.getId() != null) {
            throw new BadRequestAlertException("A new transaccionCambista cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransaccionCambista result = transaccionCambistaService.save(transaccionCambista);
        return ResponseEntity.created(new URI("/api/transaccion-cambistas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transaccion-cambistas : Updates an existing transaccionCambista.
     *
     * @param transaccionCambista the transaccionCambista to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transaccionCambista,
     * or with status 400 (Bad Request) if the transaccionCambista is not valid,
     * or with status 500 (Internal Server Error) if the transaccionCambista couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transaccion-cambistas")
    public ResponseEntity<TransaccionCambista> updateTransaccionCambista(@RequestBody TransaccionCambista transaccionCambista) throws URISyntaxException {
        log.debug("REST request to update TransaccionCambista : {}", transaccionCambista);
        if (transaccionCambista.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TransaccionCambista result = transaccionCambistaService.save(transaccionCambista);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transaccionCambista.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transaccion-cambistas : get all the transaccionCambistas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of transaccionCambistas in body
     */
    @GetMapping("/transaccion-cambistas")
    public List<TransaccionCambista> getAllTransaccionCambistas() {
        log.debug("REST request to get all TransaccionCambistas");
        return transaccionCambistaService.findAll();
    }

    /**
     * GET  /transaccion-cambistas/:id : get the "id" transaccionCambista.
     *
     * @param id the id of the transaccionCambista to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transaccionCambista, or with status 404 (Not Found)
     */
    @GetMapping("/transaccion-cambistas/{id}")
    public ResponseEntity<TransaccionCambista> getTransaccionCambista(@PathVariable Long id) {
        log.debug("REST request to get TransaccionCambista : {}", id);
        Optional<TransaccionCambista> transaccionCambista = transaccionCambistaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(transaccionCambista);
    }

    /**
     * DELETE  /transaccion-cambistas/:id : delete the "id" transaccionCambista.
     *
     * @param id the id of the transaccionCambista to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transaccion-cambistas/{id}")
    public ResponseEntity<Void> deleteTransaccionCambista(@PathVariable Long id) {
        log.debug("REST request to delete TransaccionCambista : {}", id);
        transaccionCambistaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/transaccion-cambistas?query=:query : search for the transaccionCambista corresponding
     * to the query.
     *
     * @param query the query of the transaccionCambista search
     * @return the result of the search
     */
    @GetMapping("/_search/transaccion-cambistas")
    public List<TransaccionCambista> searchTransaccionCambistas(@RequestParam String query) {
        log.debug("REST request to search TransaccionCambistas for query {}", query);
        return transaccionCambistaService.search(query);
    }

}
