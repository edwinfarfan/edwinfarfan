package pe.com.cd.service.impl;

import pe.com.cd.service.TipoDocumentoService;
import pe.com.cd.domain.TipoDocumento;
import pe.com.cd.repository.TipoDocumentoRepository;
import pe.com.cd.repository.search.TipoDocumentoSearchRepository;
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
 * Service Implementation for managing TipoDocumento.
 */
@Service
@Transactional
public class TipoDocumentoServiceImpl implements TipoDocumentoService {

    private final Logger log = LoggerFactory.getLogger(TipoDocumentoServiceImpl.class);

    private final TipoDocumentoRepository tipoDocumentoRepository;

    private final TipoDocumentoSearchRepository tipoDocumentoSearchRepository;

    public TipoDocumentoServiceImpl(TipoDocumentoRepository tipoDocumentoRepository, TipoDocumentoSearchRepository tipoDocumentoSearchRepository) {
        this.tipoDocumentoRepository = tipoDocumentoRepository;
        this.tipoDocumentoSearchRepository = tipoDocumentoSearchRepository;
    }

    /**
     * Save a tipoDocumento.
     *
     * @param tipoDocumento the entity to save
     * @return the persisted entity
     */
    @Override
    public TipoDocumento save(TipoDocumento tipoDocumento) {
        log.debug("Request to save TipoDocumento : {}", tipoDocumento);
        TipoDocumento result = tipoDocumentoRepository.save(tipoDocumento);
        tipoDocumentoSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the tipoDocumentos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoDocumento> findAll() {
        log.debug("Request to get all TipoDocumentos");
        return tipoDocumentoRepository.findAll();
    }


    /**
     * Get one tipoDocumento by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TipoDocumento> findOne(Long id) {
        log.debug("Request to get TipoDocumento : {}", id);
        return tipoDocumentoRepository.findById(id);
    }

    /**
     * Delete the tipoDocumento by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TipoDocumento : {}", id);        tipoDocumentoRepository.deleteById(id);
        tipoDocumentoSearchRepository.deleteById(id);
    }

    /**
     * Search for the tipoDocumento corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TipoDocumento> search(String query) {
        log.debug("Request to search TipoDocumentos for query {}", query);
        return StreamSupport
            .stream(tipoDocumentoSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }
}
