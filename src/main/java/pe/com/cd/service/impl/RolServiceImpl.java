package pe.com.cd.service.impl;

import pe.com.cd.service.RolService;
import pe.com.cd.domain.Rol;
import pe.com.cd.repository.RolRepository;
import pe.com.cd.repository.search.RolSearchRepository;
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
 * Service Implementation for managing Rol.
 */
@Service
@Transactional
public class RolServiceImpl implements RolService {

    private final Logger log = LoggerFactory.getLogger(RolServiceImpl.class);

    private final RolRepository rolRepository;

    private final RolSearchRepository rolSearchRepository;

    public RolServiceImpl(RolRepository rolRepository, RolSearchRepository rolSearchRepository) {
        this.rolRepository = rolRepository;
        this.rolSearchRepository = rolSearchRepository;
    }

    /**
     * Save a rol.
     *
     * @param rol the entity to save
     * @return the persisted entity
     */
    @Override
    public Rol save(Rol rol) {
        log.debug("Request to save Rol : {}", rol);
        Rol result = rolRepository.save(rol);
        rolSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the rols.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Rol> findAll() {
        log.debug("Request to get all Rols");
        return rolRepository.findAll();
    }


    /**
     * Get one rol by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Rol> findOne(Long id) {
        log.debug("Request to get Rol : {}", id);
        return rolRepository.findById(id);
    }

    /**
     * Delete the rol by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Rol : {}", id);        rolRepository.deleteById(id);
        rolSearchRepository.deleteById(id);
    }

    /**
     * Search for the rol corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Rol> search(String query) {
        log.debug("Request to search Rols for query {}", query);
        return StreamSupport
            .stream(rolSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
