package pe.com.cd.service.impl;

import pe.com.cd.service.TipoCambioVariacionService;
import pe.com.cd.domain.TipoCambioVariacion;
import pe.com.cd.repository.TipoCambioVariacionRepository;
import pe.com.cd.repository.search.TipoCambioVariacionSearchRepository;
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
 * Service Implementation for managing TipoCambioVariacion.
 */
@Service
@Transactional
public class TipoCambioVariacionServiceImpl implements TipoCambioVariacionService {

    private final Logger log = LoggerFactory.getLogger(TipoCambioVariacionServiceImpl.class);

    private final TipoCambioVariacionRepository tipoCambioVariacionRepository;

    private final TipoCambioVariacionSearchRepository tipoCambioVariacionSearchRepository;

    public TipoCambioVariacionServiceImpl(TipoCambioVariacionRepository tipoCambioVariacionRepository, TipoCambioVariacionSearchRepository tipoCambioVariacionSearchRepository) {
        this.tipoCambioVariacionRepository = tipoCambioVariacionRepository;
        this.tipoCambioVariacionSearchRepository = tipoCambioVariacionSearchRepository;
    }

    /**
     * Save a tipoCambioVariacion.
     *
     * @param tipoCambioVariacion the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoCambioVariacion save(TipoCambioVariacion tipoCambioVariacion) {
        log.debug("Request to save TipoCambioVariacion : {}", tipoCambioVariacion);
        TipoCambioVariacion result = tipoCambioVariacionRepository.save(tipoCambioVariacion);
        tipoCambioVariacionSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tipoCambioVariacions.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoCambioVariacion> findAll() {
        log.debug("Request to get all TipoCambioVariacions");
        return tipoCambioVariacionRepository.findAll();
    }


    /**
     * Get one tipoCambioVariacion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoCambioVariacion> findOne(Long id) {
        log.debug("Request to get TipoCambioVariacion : {}", id);
        return tipoCambioVariacionRepository.findById(id);
    }

    /**
     * Delete the tipoCambioVariacion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoCambioVariacion : {}", id);        tipoCambioVariacionRepository.deleteById(id);
        tipoCambioVariacionSearchRepository.deleteById(id);
    }

    /**
     * Search for the tipoCambioVariacion corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoCambioVariacion> search(String query) {
        log.debug("Request to search TipoCambioVariacions for query {}", query);
        return StreamSupport
            .stream(tipoCambioVariacionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
