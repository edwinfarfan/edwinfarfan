package pe.com.cd.service;

import pe.com.cd.domain.TipoCambioVariacion;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TipoCambioVariacion.
 */
public interface TipoCambioVariacionService {

    /**
     * Save a tipoCambioVariacion.
     *
     * @param tipoCambioVariacion the entity to save
     * @return the persisted entity
     */
    TipoCambioVariacion save(TipoCambioVariacion tipoCambioVariacion);

    /**
     * Get all the tipoCambioVariacions.
     *
     * @return the list of entities
     */
    List<TipoCambioVariacion> findAll();


    /**
     * Get the "id" tipoCambioVariacion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TipoCambioVariacion> findOne(Long id);

    /**
     * Delete the "id" tipoCambioVariacion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the tipoCambioVariacion corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TipoCambioVariacion> search(String query);
}
