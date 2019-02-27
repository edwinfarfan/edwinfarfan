package pe.com.cd.web.rest;
import pe.com.cd.domain.DireccionPersona;
import pe.com.cd.service.DireccionPersonaService;
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
 * REST controller for managing DireccionPersona.
 */
@RestController
@RequestMapping("/api")
public class DireccionPersonaResource {

    private final Logger log = LoggerFactory.getLogger(DireccionPersonaResource.class);

    private static final String ENTITY_NAME = "direccionPersona";

    private final DireccionPersonaService direccionPersonaService;

    public DireccionPersonaResource(DireccionPersonaService direccionPersonaService) {
        this.direccionPersonaService = direccionPersonaService;
    }

    /**
     * POST  /direccion-personas : Create a new direccionPersona.
     *
     * @param direccionPersona the direccionPersona to create
     * @return the ResponseEntity with status 201 (Created) and with body the new direccionPersona, or with status 400 (Bad Request) if the direccionPersona has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/direccion-personas")
    public ResponseEntity<DireccionPersona> createDireccionPersona(@RequestBody DireccionPersona direccionPersona) throws URISyntaxException {
        log.debug("REST request to save DireccionPersona : {}", direccionPersona);
        if (direccionPersona.getId() != null) {
            throw new BadRequestAlertException("A new direccionPersona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DireccionPersona result = direccionPersonaService.save(direccionPersona);
        return ResponseEntity.created(new URI("/api/direccion-personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /direccion-personas : Updates an existing direccionPersona.
     *
     * @param direccionPersona the direccionPersona to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated direccionPersona,
     * or with status 400 (Bad Request) if the direccionPersona is not valid,
     * or with status 500 (Internal Server Error) if the direccionPersona couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/direccion-personas")
    public ResponseEntity<DireccionPersona> updateDireccionPersona(@RequestBody DireccionPersona direccionPersona) throws URISyntaxException {
        log.debug("REST request to update DireccionPersona : {}", direccionPersona);
        if (direccionPersona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DireccionPersona result = direccionPersonaService.save(direccionPersona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, direccionPersona.getId().toString()))
            .body(result);
    }

    /**
     * GET  /direccion-personas : get all the direccionPersonas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of direccionPersonas in body
     */
    @GetMapping("/direccion-personas")
    public List<DireccionPersona> getAllDireccionPersonas() {
        log.debug("REST request to get all DireccionPersonas");
        return direccionPersonaService.findAll();
    }

    /**
     * GET  /direccion-personas/:id : get the "id" direccionPersona.
     *
     * @param id the id of the direccionPersona to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the direccionPersona, or with status 404 (Not Found)
     */
    @GetMapping("/direccion-personas/{id}")
    public ResponseEntity<DireccionPersona> getDireccionPersona(@PathVariable Long id) {
        log.debug("REST request to get DireccionPersona : {}", id);
        Optional<DireccionPersona> direccionPersona = direccionPersonaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(direccionPersona);
    }

    /**
     * DELETE  /direccion-personas/:id : delete the "id" direccionPersona.
     *
     * @param id the id of the direccionPersona to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/direccion-personas/{id}")
    public ResponseEntity<Void> deleteDireccionPersona(@PathVariable Long id) {
        log.debug("REST request to delete DireccionPersona : {}", id);
        direccionPersonaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/direccion-personas?query=:query : search for the direccionPersona corresponding
     * to the query.
     *
     * @param query the query of the direccionPersona search
     * @return the result of the search
     */
    @GetMapping("/_search/direccion-personas")
    public List<DireccionPersona> searchDireccionPersonas(@RequestParam String query) {
        log.debug("REST request to search DireccionPersonas for query {}", query);
        return direccionPersonaService.search(query);
    }

}
