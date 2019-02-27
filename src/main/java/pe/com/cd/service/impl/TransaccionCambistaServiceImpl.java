package pe.com.cd.service.impl;

import pe.com.cd.service.TransaccionCambistaService;
import pe.com.cd.domain.TransaccionCambista;
import pe.com.cd.repository.TransaccionCambistaRepository;
import pe.com.cd.repository.search.TransaccionCambistaSearchRepository;
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
 * Service Implementation for managing TransaccionCambista.
 */
@Service
@Transactional
public class TransaccionCambistaServiceImpl implements TransaccionCambistaService {

    private final Logger log = LoggerFactory.getLogger(TransaccionCambistaServiceImpl.class);

    private final TransaccionCambistaRepository transaccionCambistaRepository;

    private final TransaccionCambistaSearchRepository transaccionCambistaSearchRepository;

    public TransaccionCambistaServiceImpl(TransaccionCambistaRepository transaccionCambistaRepository, TransaccionCambistaSearchRepository transaccionCambistaSearchRepository) {
        this.transaccionCambistaRepository = transaccionCambistaRepository;
        this.transaccionCambistaSearchRepository = transaccionCambistaSearchRepository;
    }

    /**
     * Save a transaccionCambista.
     *
     * @param transaccionCambista the entity to save
     * @return the persisted entity
     */
    @Override
    public TransaccionCambista save(TransaccionCambista transaccionCambista) {
        log.debug("Request to save TransaccionCambista : {}", transaccionCambista);
        TransaccionCambista result = transaccionCambistaRepository.save(transaccionCambista);
        transaccionCambistaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the transaccionCambistas.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransaccionCambista> findAll() {
        log.debug("Request to get all TransaccionCambistas");
        return transaccionCambistaRepository.findAll();
    }


    /**
     * Get one transaccionCambista by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TransaccionCambista> findOne(Long id) {
        log.debug("Request to get TransaccionCambista : {}", id);
        return transaccionCambistaRepository.findById(id);
    }

    /**
     * Delete the transaccionCambista by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransaccionCambista : {}", id);        transaccionCambistaRepository.deleteById(id);
        transaccionCambistaSearchRepository.deleteById(id);
    }

    /**
     * Search for the transaccionCambista corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TransaccionCambista> search(String query) {
        log.debug("Request to search TransaccionCambistas for query {}", query);
        return StreamSupport
            .stream(transaccionCambistaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
