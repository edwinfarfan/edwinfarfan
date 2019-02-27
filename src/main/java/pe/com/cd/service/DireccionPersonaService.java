package pe.com.cd.service;

import pe.com.cd.domain.DireccionPersona;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DireccionPersona.
 */
public interface DireccionPersonaService {

    /**
     * Save a direccionPersona.
     *
     * @param direccionPersona the entity to save
     * @return the persisted entity
     */
    DireccionPersona save(DireccionPersona direccionPersona);

    /**
     * Get all the direccionPersonas.
     *
     * @return the list of entities
     */
    List<DireccionPersona> findAll();


    /**
     * Get the "id" direccionPersona.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DireccionPersona> findOne(Long id);

    /**
     * Delete the "id" direccionPersona.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the direccionPersona corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<DireccionPersona> search(String query);
}
