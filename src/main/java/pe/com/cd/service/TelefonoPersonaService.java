package pe.com.cd.service;

import pe.com.cd.domain.TelefonoPersona;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TelefonoPersona.
 */
public interface TelefonoPersonaService {

    /**
     * Save a telefonoPersona.
     *
     * @param telefonoPersona the entity to save
     * @return the persisted entity
     */
    TelefonoPersona save(TelefonoPersona telefonoPersona);

    /**
     * Get all the telefonoPersonas.
     *
     * @return the list of entities
     */
    List<TelefonoPersona> findAll();


    /**
     * Get the "id" telefonoPersona.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TelefonoPersona> findOne(Long id);

    /**
     * Delete the "id" telefonoPersona.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the telefonoPersona corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<TelefonoPersona> search(String query);
}
