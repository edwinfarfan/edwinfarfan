package pe.com.cd.service.impl;

import pe.com.cd.service.TipoCambioService;
import pe.com.cd.domain.TipoCambio;
import pe.com.cd.repository.TipoCambioRepository;
import pe.com.cd.repository.search.TipoCambioSearchRepository;
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
 * Service Implementation for managing TipoCambio.
 */
@Service
@Transactional
public class TipoCambioServiceImpl implements TipoCambioService {

    private final Logger log = LoggerFactory.getLogger(TipoCambioServiceImpl.class);

    private final TipoCambioRepository tipoCambioRepository;

    private final TipoCambioSearchRepository tipoCambioSearchRepository;

    public TipoCambioServiceImpl(TipoCambioRepository tipoCambioRepository, TipoCambioSearchRepository tipoCambioSearchRepository) {
        this.tipoCambioRepository = tipoCambioRepository;
        this.tipoCambioSearchRepository = tipoCambioSearchRepository;
    }

    /**
     * Save a tipoCambio.
     *
     * @param tipoCambio the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoCambio save(TipoCambio tipoCambio) {
        log.debug("Request to save TipoCambio : {}", tipoCambio);
        TipoCambio result = tipoCambioRepository.save(tipoCambio);
        tipoCambioSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tipoCambios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoCambio> findAll() {
        log.debug("Request to get all TipoCambios");
        return tipoCambioRepository.findAll();
    }


    /**
     * Get one tipoCambio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoCambio> findOne(Long id) {
        log.debug("Request to get TipoCambio : {}", id);
        return tipoCambioRepository.findById(id);
    }

    /**
     * Delete the tipoCambio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoCambio : {}", id);        tipoCambioRepository.deleteById(id);
        tipoCambioSearchRepository.deleteById(id);
    }

    /**
     * Search for the tipoCambio corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoCambio> search(String query) {
        log.debug("Request to search TipoCambios for query {}", query);
        return StreamSupport
            .stream(tipoCambioSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
