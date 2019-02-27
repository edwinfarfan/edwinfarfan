package pe.com.cd.web.rest;
import pe.com.cd.domain.TipoCambioVariacion;
import pe.com.cd.service.TipoCambioVariacionService;
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
 * REST controller for managing TipoCambioVariacion.
 */
@RestController
@RequestMapping("/api")
public class TipoCambioVariacionResource {

    private final Logger log = LoggerFactory.getLogger(TipoCambioVariacionResource.class);

    private static final String ENTITY_NAME = "tipoCambioVariacion";

    private final TipoCambioVariacionService tipoCambioVariacionService;

    public TipoCambioVariacionResource(TipoCambioVariacionService tipoCambioVariacionService) {
        this.tipoCambioVariacionService = tipoCambioVariacionService;
    }

    /**
     * POST  /tipo-cambio-variacions : Create a new tipoCambioVariacion.
     *
     * @param tipoCambioVariacion the tipoCambioVariacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoCambioVariacion, or with status 400 (Bad Request) if the tipoCambioVariacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-cambio-variacions")
    public ResponseEntity<TipoCambioVariacion> createTipoCambioVariacion(@RequestBody TipoCambioVariacion tipoCambioVariacion) throws URISyntaxException {
        log.debug("REST request to save TipoCambioVariacion : {}", tipoCambioVariacion);
        if (tipoCambioVariacion.getId() != null) {
            throw new BadRequestAlertException("A new tipoCambioVariacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCambioVariacion result = tipoCambioVariacionService.save(tipoCambioVariacion);
        return ResponseEntity.created(new URI("/api/tipo-cambio-variacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-cambio-variacions : Updates an existing tipoCambioVariacion.
     *
     * @param tipoCambioVariacion the tipoCambioVariacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoCambioVariacion,
     * or with status 400 (Bad Request) if the tipoCambioVariacion is not valid,
     * or with status 500 (Internal Server Error) if the tipoCambioVariacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-cambio-variacions")
    public ResponseEntity<TipoCambioVariacion> updateTipoCambioVariacion(@RequestBody TipoCambioVariacion tipoCambioVariacion) throws URISyntaxException {
        log.debug("REST request to update TipoCambioVariacion : {}", tipoCambioVariacion);
        if (tipoCambioVariacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoCambioVariacion result = tipoCambioVariacionService.save(tipoCambioVariacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoCambioVariacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-cambio-variacions : get all the tipoCambioVariacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoCambioVariacions in body
     */
    @GetMapping("/tipo-cambio-variacions")
    public List<TipoCambioVariacion> getAllTipoCambioVariacions() {
        log.debug("REST request to get all TipoCambioVariacions");
        return tipoCambioVariacionService.findAll();
    }

    /**
     * GET  /tipo-cambio-variacions/:id : get the "id" tipoCambioVariacion.
     *
     * @param id the id of the tipoCambioVariacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoCambioVariacion, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-cambio-variacions/{id}")
    public ResponseEntity<TipoCambioVariacion> getTipoCambioVariacion(@PathVariable Long id) {
        log.debug("REST request to get TipoCambioVariacion : {}", id);
        Optional<TipoCambioVariacion> tipoCambioVariacion = tipoCambioVariacionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoCambioVariacion);
    }

    /**
     * DELETE  /tipo-cambio-variacions/:id : delete the "id" tipoCambioVariacion.
     *
     * @param id the id of the tipoCambioVariacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-cambio-variacions/{id}")
    public ResponseEntity<Void> deleteTipoCambioVariacion(@PathVariable Long id) {
        log.debug("REST request to delete TipoCambioVariacion : {}", id);
        tipoCambioVariacionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-cambio-variacions?query=:query : search for the tipoCambioVariacion corresponding
     * to the query.
     *
     * @param query the query of the tipoCambioVariacion search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-cambio-variacions")
    public List<TipoCambioVariacion> searchTipoCambioVariacions(@RequestParam String query) {
        log.debug("REST request to search TipoCambioVariacions for query {}", query);
        return tipoCambioVariacionService.search(query);
    }

}
