package pe.com.cd.service.impl;

import pe.com.cd.service.UsuarioService;
import pe.com.cd.domain.Usuario;
import pe.com.cd.repository.UsuarioRepository;
import pe.com.cd.repository.search.UsuarioSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Usuario.
 */
@Service
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final Logger log = LoggerFactory.getLogger(UsuarioServiceImpl.class);

    private final UsuarioRepository usuarioRepository;

    private final UsuarioSearchRepository usuarioSearchRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, UsuarioSearchRepository usuarioSearchRepository) {
        this.usuarioRepository = usuarioRepository;
        this.usuarioSearchRepository = usuarioSearchRepository;
    }

    /**
     * Save a usuario.
     *
     * @param usuario the entity to save
     * @return the persisted entity
     */
    @Override
    public Usuario save(Usuario usuario) {
        log.debug("Request to save Usuario : {}", usuario);
        Usuario result = usuarioRepository.save(usuario);
        usuarioSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the usuarios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {
        log.debug("Request to get all Usuarios");
        return usuarioRepository.findAll();
    }


    /**
     * Get one usuario by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findOne(Long id) {
        log.debug("Request to get Usuario : {}", id);
        return usuarioRepository.findById(id);
    }

    /**
     * Delete the usuario by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Usuario : {}", id);        usuarioRepository.deleteById(id);
        usuarioSearchRepository.deleteById(id);
    }

    /**
     * Search for the usuario corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Usuario> search(String query) {
        log.debug("Request to search Usuarios for query {}", query);
        return StreamSupport
            .stream(usuarioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
