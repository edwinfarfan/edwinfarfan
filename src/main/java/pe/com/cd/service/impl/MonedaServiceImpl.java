package pe.com.cd.service.impl;

import pe.com.cd.service.MonedaService;
import pe.com.cd.domain.Moneda;
import pe.com.cd.repository.MonedaRepository;
import pe.com.cd.repository.search.MonedaSearchRepository;
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
 * Service Implementation for managing Moneda.
 */
@Service
@Transactional
public class MonedaServiceImpl implements MonedaService {

    private final Logger log = LoggerFactory.getLogger(MonedaServiceImpl.class);

    private final MonedaRepository monedaRepository;

    private final MonedaSearchRepository monedaSearchRepository;

    public MonedaServiceImpl(MonedaRepository monedaRepository, MonedaSearchRepository monedaSearchRepository) {
        this.monedaRepository = monedaRepository;
        this.monedaSearchRepository = monedaSearchRepository;
    }

    /**
     * Save a moneda.
     *
     * @param moneda the entity to save
     * @return the persisted entity
     */
    @Override
    public Moneda save(Moneda moneda) {
        log.debug("Request to save Moneda : {}", moneda);
        Moneda result = monedaRepository.save(moneda);
        monedaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the monedas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Moneda> findAll() {
        log.debug("Request to get all Monedas");
        return monedaRepository.findAll();
    }


    /**
     * Get one moneda by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Moneda> findOne(Long id) {
        log.debug("Request to get Moneda : {}", id);
        return monedaRepository.findById(id);
    }

    /**
     * Delete the moneda by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Moneda : {}", id);        monedaRepository.deleteById(id);
        monedaSearchRepository.deleteById(id);
    }

    /**
     * Search for the moneda corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Moneda> search(String query) {
        log.debug("Request to search Monedas for query {}", query);
        return StreamSupport
            .stream(monedaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
