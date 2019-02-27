package pe.com.cd.service.impl;

import pe.com.cd.service.UsuarioRolService;
import pe.com.cd.domain.UsuarioRol;
import pe.com.cd.repository.UsuarioRolRepository;
import pe.com.cd.repository.search.UsuarioRolSearchRepository;
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
 * Service Implementation for managing UsuarioRol.
 */
@Service
@Transactional
public class UsuarioRolServiceImpl implements UsuarioRolService {

    private final Logger log = LoggerFactory.getLogger(UsuarioRolServiceImpl.class);

    private final UsuarioRolRepository usuarioRolRepository;

    private final UsuarioRolSearchRepository usuarioRolSearchRepository;

    public UsuarioRolServiceImpl(UsuarioRolRepository usuarioRolRepository, UsuarioRolSearchRepository usuarioRolSearchRepository) {
        this.usuarioRolRepository = usuarioRolRepository;
        this.usuarioRolSearchRepository = usuarioRolSearchRepository;
    }

    /**
     * Save a usuarioRol.
     *
     * @param usuarioRol the entity to save
     * @return the persisted entity
     */
    @Override
    public UsuarioRol save(UsuarioRol usuarioRol) {
        log.debug("Request to save UsuarioRol : {}", usuarioRol);
        UsuarioRol result = usuarioRolRepository.save(usuarioRol);
        usuarioRolSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the usuarioRols.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioRol> findAll() {
        log.debug("Request to get all UsuarioRols");
        return usuarioRolRepository.findAll();
    }


    /**
     * Get one usuarioRol by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UsuarioRol> findOne(Long id) {
        log.debug("Request to get UsuarioRol : {}", id);
        return usuarioRolRepository.findById(id);
    }

    /**
     * Delete the usuarioRol by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UsuarioRol : {}", id);        usuarioRolRepository.deleteById(id);
        usuarioRolSearchRepository.deleteById(id);
    }

    /**
     * Search for the usuarioRol corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UsuarioRol> search(String query) {
        log.debug("Request to search UsuarioRols for query {}", query);
        return StreamSupport
            .stream(usuarioRolSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
