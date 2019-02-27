package pe.com.cd.service;

import pe.com.cd.domain.TipoDocumento;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TipoDocumento.
 */
public interface TipoDocumentoService {

    /**
     * Save a tipoDocumento.
     *
     * @param tipoDocumento the entity to save
     * @return the persisted entity
     */
    TipoDocumento save(TipoDocumento tipoDocumento);

    /**
     * Get all the tipoDocumentos.
     *
     * @return the list of entities
     */
    List<TipoDocumento> findAll();


    /**
     * Get the "id" tipoDocumento.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TipoDocumento> findOne(Long id);

    /**
     * Delete the "id" tipoDocumento.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tipoDocumento corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TipoDocumento> search(String query);
}
