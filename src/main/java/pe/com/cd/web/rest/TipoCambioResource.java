package pe.com.cd.web.rest;
import pe.com.cd.domain.TipoCambio;
import pe.com.cd.service.TipoCambioService;
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
 * REST controller for managing TipoCambio.
 */
@RestController
@RequestMapping("/api")
public class TipoCambioResource {

    private final Logger log = LoggerFactory.getLogger(TipoCambioResource.class);

    private static final String ENTITY_NAME = "tipoCambio";

    private final TipoCambioService tipoCambioService;

    public TipoCambioResource(TipoCambioService tipoCambioService) {
        this.tipoCambioService = tipoCambioService;
    }

    /**
     * POST  /tipo-cambios : Create a new tipoCambio.
     *
     * @param tipoCambio the tipoCambio to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoCambio, or with status 400 (Bad Request) if the tipoCambio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-cambios")
    public ResponseEntity<TipoCambio> createTipoCambio(@RequestBody TipoCambio tipoCambio) throws URISyntaxException {
        log.debug("REST request to save TipoCambio : {}", tipoCambio);
        if (tipoCambio.getId() != null) {
            throw new BadRequestAlertException("A new tipoCambio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCambio result = tipoCambioService.save(tipoCambio);
        return ResponseEntity.created(new URI("/api/tipo-cambios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-cambios : Updates an existing tipoCambio.
     *
     * @param tipoCambio the tipoCambio to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoCambio,
     * or with status 400 (Bad Request) if the tipoCambio is not valid,
     * or with status 500 (Internal Server Error) if the tipoCambio couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-cambios")
    public ResponseEntity<TipoCambio> updateTipoCambio(@RequestBody TipoCambio tipoCambio) throws URISyntaxException {
        log.debug("REST request to update TipoCambio : {}", tipoCambio);
        if (tipoCambio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoCambio result = tipoCambioService.save(tipoCambio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoCambio.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-cambios : get all the tipoCambios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoCambios in body
     */
    @GetMapping("/tipo-cambios")
    public List<TipoCambio> getAllTipoCambios() {
        log.debug("REST request to get all TipoCambios");
        return tipoCambioService.findAll();
    }

    /**
     * GET  /tipo-cambios/:id : get the "id" tipoCambio.
     *
     * @param id the id of the tipoCambio to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoCambio, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-cambios/{id}")
    public ResponseEntity<TipoCambio> getTipoCambio(@PathVariable Long id) {
        log.debug("REST request to get TipoCambio : {}", id);
        Optional<TipoCambio> tipoCambio = tipoCambioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(tipoCambio);
    }

    /**
     * DELETE  /tipo-cambios/:id : delete the "id" tipoCambio.
     *
     * @param id the id of the tipoCambio to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-cambios/{id}")
    public ResponseEntity<Void> deleteTipoCambio(@PathVariable Long id) {
        log.debug("REST request to delete TipoCambio : {}", id);
        tipoCambioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/tipo-cambios?query=:query : search for the tipoCambio corresponding
     * to the query.
     *
     * @param query the query of the tipoCambio search
     * @return the result of the search
     */
    @GetMapping("/_search/tipo-cambios")
    public List<TipoCambio> searchTipoCambios(@RequestParam String query) {
        log.debug("REST request to search TipoCambios for query {}", query);
        return tipoCambioService.search(query);
    }

}
