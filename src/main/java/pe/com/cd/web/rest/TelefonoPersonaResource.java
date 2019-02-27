package pe.com.cd.web.rest;
import pe.com.cd.domain.TelefonoPersona;
import pe.com.cd.service.TelefonoPersonaService;
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
 * REST controller for managing TelefonoPersona.
 */
@RestController
@RequestMapping("/api")
public class TelefonoPersonaResource {

    private final Logger log = LoggerFactory.getLogger(TelefonoPersonaResource.class);

    private static final String ENTITY_NAME = "telefonoPersona";

    private final TelefonoPersonaService telefonoPersonaService;

    public TelefonoPersonaResource(TelefonoPersonaService telefonoPersonaService) {
        this.telefonoPersonaService = telefonoPersonaService;
    }

    /**
     * POST  /telefono-personas : Create a new telefonoPersona.
     *
     * @param telefonoPersona the telefonoPersona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new telefonoPersona, or with status 400 (Bad Request) if the telefonoPersona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/telefono-personas")
    public ResponseEntity<TelefonoPersona> createTelefonoPersona(@RequestBody TelefonoPersona telefonoPersona) throws URISyntaxException {
        log.debug("REST request to save TelefonoPersona : {}", telefonoPersona);
        if (telefonoPersona.getId() != null) {
            throw new BadRequestAlertException("A new telefonoPersona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TelefonoPersona result = telefonoPersonaService.save(telefonoPersona);
        return ResponseEntity.created(new URI("/api/telefono-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /telefono-personas : Updates an existing telefonoPersona.
     *
     * @param telefonoPersona the telefonoPersona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated telefonoPersona,
     * or with status 400 (Bad Request) if the telefonoPersona is not valid,
     * or with status 500 (Internal Server Error) if the telefonoPersona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/telefono-personas")
    public ResponseEntity<TelefonoPersona> updateTelefonoPersona(@RequestBody TelefonoPersona telefonoPersona) throws URISyntaxException {
        log.debug("REST request to update TelefonoPersona : {}", telefonoPersona);
        if (telefonoPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TelefonoPersona result = telefonoPersonaService.save(telefonoPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, telefonoPersona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /telefono-personas : get all the telefonoPersonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of telefonoPersonas in body
     */
    @GetMapping("/telefono-personas")
    public List<TelefonoPersona> getAllTelefonoPersonas() {
        log.debug("REST request to get all TelefonoPersonas");
        return telefonoPersonaService.findAll();
    }

    /**
     * GET  /telefono-personas/:id : get the "id" telefonoPersona.
     *
     * @param id the id of the telefonoPersona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the telefonoPersona, or with status 404 (Not Found)
     */
    @GetMapping("/telefono-personas/{id}")
    public ResponseEntity<TelefonoPersona> getTelefonoPersona(@PathVariable Long id) {
        log.debug("REST request to get TelefonoPersona : {}", id);
        Optional<TelefonoPersona> telefonoPersona = telefonoPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(telefonoPersona);
    }

    /**
     * DELETE  /telefono-personas/:id : delete the "id" telefonoPersona.
     *
     * @param id the id of the telefonoPersona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/telefono-personas/{id}")
    public ResponseEntity<Void> deleteTelefonoPersona(@PathVariable Long id) {
        log.debug("REST request to delete TelefonoPersona : {}", id);
        telefonoPersonaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/telefono-personas?query=:query : search for the telefonoPersona corresponding
     * to the query.
     *
     * @param query the query of the telefonoPersona search
     * @return the result of the search
     */
    @GetMapping("/_search/telefono-personas")
    public List<TelefonoPersona> searchTelefonoPersonas(@RequestParam String query) {
        log.debug("REST request to search TelefonoPersonas for query {}", query);
        return telefonoPersonaService.search(query);
    }

}
