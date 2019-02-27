package pe.com.cd.web.rest;
import pe.com.cd.domain.Permiso;
import pe.com.cd.service.PermisoService;
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
 * REST controller for managing Permiso.
 */
@RestController
@RequestMapping("/api")
public class PermisoResource {

    private final Logger log = LoggerFactory.getLogger(PermisoResource.class);

    private static final String ENTITY_NAME = "permiso";

    private final PermisoService permisoService;

    public PermisoResource(PermisoService permisoService) {
        this.permisoService = permisoService;
    }

    /**
     * POST  /permisos : Create a new permiso.
     *
     * @param permiso the permiso to create
     * @return the ResponseEntity with status 201 (Created) and with body the new permiso, or with status 400 (Bad Request) if the permiso has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/permisos")
    public ResponseEntity<Permiso> createPermiso(@RequestBody Permiso permiso) throws URISyntaxException {
        log.debug("REST request to save Permiso : {}", permiso);
        if (permiso.getId() != null) {
            throw new BadRequestAlertException("A new permiso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Permiso result = permisoService.save(permiso);
        return ResponseEntity.created(new URI("/api/permisos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /permisos : Updates an existing permiso.
     *
     * @param permiso the permiso to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated permiso,
     * or with status 400 (Bad Request) if the permiso is not valid,
     * or with status 500 (Internal Server Error) if the permiso couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/permisos")
    public ResponseEntity<Permiso> updatePermiso(@RequestBody Permiso permiso) throws URISyntaxException {
        log.debug("REST request to update Permiso : {}", permiso);
        if (permiso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Permiso result = permisoService.save(permiso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, permiso.getId().toString()))
            .body(result);
    }

    /**
     * GET  /permisos : get all the permisos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of permisos in body
     */
    @GetMapping("/permisos")
    public List<Permiso> getAllPermisos() {
        log.debug("REST request to get all Permisos");
        return permisoService.findAll();
    }

    /**
     * GET  /permisos/:id : get the "id" permiso.
     *
     * @param id the id of the permiso to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the permiso, or with status 404 (Not Found)
     */
    @GetMapping("/permisos/{id}")
    public ResponseEntity<Permiso> getPermiso(@PathVariable Long id) {
        log.debug("REST request to get Permiso : {}", id);
        Optional<Permiso> permiso = permisoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(permiso);
    }

    /**
     * DELETE  /permisos/:id : delete the "id" permiso.
     *
     * @param id the id of the permiso to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/permisos/{id}")
    public ResponseEntity<Void> deletePermiso(@PathVariable Long id) {
        log.debug("REST request to delete Permiso : {}", id);
        permisoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/permisos?query=:query : search for the permiso corresponding
     * to the query.
     *
     * @param query the query of the permiso search
     * @return the result of the search
     */
    @GetMapping("/_search/permisos")
    public List<Permiso> searchPermisos(@RequestParam String query) {
        log.debug("REST request to search Permisos for query {}", query);
        return permisoService.search(query);
    }

}
