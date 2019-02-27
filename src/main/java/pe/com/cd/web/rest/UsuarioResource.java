package pe.com.cd.web.rest;
import pe.com.cd.domain.Usuario;
import pe.com.cd.service.UsuarioService;
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
 * REST controller for managing Usuario.
 */
@RestController
@RequestMapping("/api")
public class UsuarioResource {

    private final Logger log = LoggerFactory.getLogger(UsuarioResource.class);

    private static final String ENTITY_NAME = "usuario";

    private final UsuarioService usuarioService;

    public UsuarioResource(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    /**
     * POST  /usuarios : Create a new usuario.
     *
     * @param usuario the usuario to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usuario, or with status 400 (Bad Request) if the usuario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to save Usuario : {}", usuario);
        if (usuario.getId() != null) {
            throw new BadRequestAlertException("A new usuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.created(new URI("/api/usuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usuarios : Updates an existing usuario.
     *
     * @param usuario the usuario to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usuario,
     * or with status 400 (Bad Request) if the usuario is not valid,
     * or with status 500 (Internal Server Error) if the usuario couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/usuarios")
    public ResponseEntity<Usuario> updateUsuario(@RequestBody Usuario usuario) throws URISyntaxException {
        log.debug("REST request to update Usuario : {}", usuario);
        if (usuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Usuario result = usuarioService.save(usuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usuario.getId().toString()))
            .body(result);
    }

    /**
     * GET  /usuarios : get all the usuarios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of usuarios in body
     */
    @GetMapping("/usuarios")
    public List<Usuario> getAllUsuarios() {
        log.debug("REST request to get all Usuarios");
        return usuarioService.findAll();
    }

    /**
     * GET  /usuarios/:id : get the "id" usuario.
     *
     * @param id the id of the usuario to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usuario, or with status 404 (Not Found)
     */
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> getUsuario(@PathVariable Long id) {
        log.debug("REST request to get Usuario : {}", id);
        Optional<Usuario> usuario = usuarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(usuario);
    }

    /**
     * DELETE  /usuarios/:id : delete the "id" usuario.
     *
     * @param id the id of the usuario to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        log.debug("REST request to delete Usuario : {}", id);
        usuarioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/usuarios?query=:query : search for the usuario corresponding
     * to the query.
     *
     * @param query the query of the usuario search
     * @return the result of the search
     */
    @GetMapping("/_search/usuarios")
    public List<Usuario> searchUsuarios(@RequestParam String query) {
        log.debug("REST request to search Usuarios for query {}", query);
        return usuarioService.search(query);
    }

}
