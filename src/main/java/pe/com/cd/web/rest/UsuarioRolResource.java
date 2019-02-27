package pe.com.cd.web.rest;
import pe.com.cd.domain.UsuarioRol;
import pe.com.cd.service.UsuarioRolService;
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
 * REST controller for managing UsuarioRol.
 */
@RestController
@RequestMapping("/api")
public class UsuarioRolResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioRolResource.class);

    private static final String ENTITY_NAME = "usuarioRol";

    private final UsuarioRolService usuarioRolService;

    public UsuarioRolResource(UsuarioRolService usuarioRolService) {
        this.usuarioRolService = usuarioRolService;
    }

    /**
     * POST  /usuario-rols : Create a new usuarioRol.
     *
     * @param usuarioRol the usuarioRol to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usuarioRol, or with status 400 (Bad Request) if the usuarioRol has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/usuario-rols")
    public ResponseEntity<UsuarioRol> createUsuarioRol(@RequestBody UsuarioRol usuarioRol) throws URISyntaxException {
        log.debug("REST request to save UsuarioRol : {}", usuarioRol);
        if (usuarioRol.getId() != null) {
            throw new BadRequestAlertException("A new usuarioRol cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuarioRol result = usuarioRolService.save(usuarioRol);
        return ResponseEntity.created(new URI("/api/usuario-rols/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usuario-rols : Updates an existing usuarioRol.
     *
     * @param usuarioRol the usuarioRol to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usuarioRol,
     * or with status 400 (Bad Request) if the usuarioRol is not valid,
     * or with status 500 (Internal Server Error) if the usuarioRol couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/usuario-rols")
    public ResponseEntity<UsuarioRol> updateUsuarioRol(@RequestBody UsuarioRol usuarioRol) throws URISyntaxException {
        log.debug("REST request to update UsuarioRol : {}", usuarioRol);
        if (usuarioRol.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UsuarioRol result = usuarioRolService.save(usuarioRol);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usuarioRol.getId().toString()))
            .body(result);
    }

    /**
     * GET  /usuario-rols : get all the usuarioRols.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of usuarioRols in body
     */
    @GetMapping("/usuario-rols")
    public List<UsuarioRol> getAllUsuarioRols() {
        log.debug("REST request to get all UsuarioRols");
        return usuarioRolService.findAll();
    }

    /**
     * GET  /usuario-rols/:id : get the "id" usuarioRol.
     *
     * @param id the id of the usuarioRol to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usuarioRol, or with status 404 (Not Found)
     */
    @GetMapping("/usuario-rols/{id}")
    public ResponseEntity<UsuarioRol> getUsuarioRol(@PathVariable Long id) {
        log.debug("REST request to get UsuarioRol : {}", id);
        Optional<UsuarioRol> usuarioRol = usuarioRolService.findOne(id);
        return ResponseUtil.wrapOrNotFound(usuarioRol);
    }

    /**
     * DELETE  /usuario-rols/:id : delete the "id" usuarioRol.
     *
     * @param id the id of the usuarioRol to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/usuario-rols/{id}")
    public ResponseEntity<Void> deleteUsuarioRol(@PathVariable Long id) {
        log.debug("REST request to delete UsuarioRol : {}", id);
        usuarioRolService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/usuario-rols?query=:query : search for the usuarioRol corresponding
     * to the query.
     *
     * @param query the query of the usuarioRol search
     * @return the result of the search
     */
    @GetMapping("/_search/usuario-rols")
    public List<UsuarioRol> searchUsuarioRols(@RequestParam String query) {
        log.debug("REST request to search UsuarioRols for query {}", query);
        return usuarioRolService.search(query);
    }

}
