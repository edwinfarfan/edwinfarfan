package pe.com.cd.web.rest;
import pe.com.cd.domain.Moneda;
import pe.com.cd.service.MonedaService;
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
 * REST controller for managing Moneda.
 */
@RestController
@RequestMapping("/api")
public class MonedaResource {

    private final Logger log = LoggerFactory.getLogger(MonedaResource.class);

    private static final String ENTITY_NAME = "moneda";

    private final MonedaService monedaService;

    public MonedaResource(MonedaService monedaService) {
        this.monedaService = monedaService;
    }

    /**
     * POST  /monedas : Create a new moneda.
     *
     * @param moneda the moneda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new moneda, or with status 400 (Bad Request) if the moneda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/monedas")
    public ResponseEntity<Moneda> createMoneda(@RequestBody Moneda moneda) throws URISyntaxException {
        log.debug("REST request to save Moneda : {}", moneda);
        if (moneda.getId() != null) {
            throw new BadRequestAlertException("A new moneda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Moneda result = monedaService.save(moneda);
        return ResponseEntity.created(new URI("/api/monedas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /monedas : Updates an existing moneda.
     *
     * @param moneda the moneda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated moneda,
     * or with status 400 (Bad Request) if the moneda is not valid,
     * or with status 500 (Internal Server Error) if the moneda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/monedas")
    public ResponseEntity<Moneda> updateMoneda(@RequestBody Moneda moneda) throws URISyntaxException {
        log.debug("REST request to update Moneda : {}", moneda);
        if (moneda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Moneda result = monedaService.save(moneda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, moneda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /monedas : get all the monedas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of monedas in body
     */
    @GetMapping("/monedas")
    public List<Moneda> getAllMonedas() {
        log.debug("REST request to get all Monedas");
        return monedaService.findAll();
    }

    /**
     * GET  /monedas/:id : get the "id" moneda.
     *
     * @param id the id of the moneda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the moneda, or with status 404 (Not Found)
     */
    @GetMapping("/monedas/{id}")
    public ResponseEntity<Moneda> getMoneda(@PathVariable Long id) {
        log.debug("REST request to get Moneda : {}", id);
        Optional<Moneda> moneda = monedaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(moneda);
    }

    /**
     * DELETE  /monedas/:id : delete the "id" moneda.
     *
     * @param id the id of the moneda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/monedas/{id}")
    public ResponseEntity<Void> deleteMoneda(@PathVariable Long id) {
        log.debug("REST request to delete Moneda : {}", id);
        monedaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/monedas?query=:query : search for the moneda corresponding
     * to the query.
     *
     * @param query the query of the moneda search
     * @return the result of the search
     */
    @GetMapping("/_search/monedas")
    public List<Moneda> searchMonedas(@RequestParam String query) {
        log.debug("REST request to search Monedas for query {}", query);
        return monedaService.search(query);
    }

}
