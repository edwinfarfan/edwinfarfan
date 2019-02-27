package pe.com.cd.service.impl;

import pe.com.cd.service.PermisoService;
import pe.com.cd.domain.Permiso;
import pe.com.cd.repository.PermisoRepository;
import pe.com.cd.repository.search.PermisoSearchRepository;
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
 * Service Implementation for managing Permiso.
 */
@Service
@Transactional
public class PermisoServiceImpl implements PermisoService {

    private final Logger log = LoggerFactory.getLogger(PermisoServiceImpl.class);

    private final PermisoRepository permisoRepository;

    private final PermisoSearchRepository permisoSearchRepository;

    public PermisoServiceImpl(PermisoRepository permisoRepository, PermisoSearchRepository permisoSearchRepository) {
        this.permisoRepository = permisoRepository;
        this.permisoSearchRepository = permisoSearchRepository;
    }

    /**
     * Save a permiso.
     *
     * @param permiso the entity to save
     * @return the persisted entity
     */
    @Override
    public Permiso save(Permiso permiso) {
        log.debug("Request to save Permiso : {}", permiso);
        Permiso result = permisoRepository.save(permiso);
        permisoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the permisos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Permiso> findAll() {
        log.debug("Request to get all Permisos");
        return permisoRepository.findAll();
    }


    /**
     * Get one permiso by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Permiso> findOne(Long id) {
        log.debug("Request to get Permiso : {}", id);
        return permisoRepository.findById(id);
    }

    /**
     * Delete the permiso by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Permiso : {}", id);        permisoRepository.deleteById(id);
        permisoSearchRepository.deleteById(id);
    }

    /**
     * Search for the permiso corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Permiso> search(String query) {
        log.debug("Request to search Permisos for query {}", query);
        return StreamSupport
            .stream(permisoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
