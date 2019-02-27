package pe.com.cd.service;

import pe.com.cd.domain.Permiso;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Permiso.
 */
public interface PermisoService {

    /**
     * Save a permiso.
     *
     * @param permiso the entity to save
     * @return the persisted entity
     */
    Permiso save(Permiso permiso);

    /**
     * Get all the permisos.
     *
     * @return the list of entities
     */
    List<Permiso> findAll();


    /**
     * Get the "id" permiso.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Permiso> findOne(Long id);

    /**
     * Delete the "id" permiso.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the permiso corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<Permiso> search(String query);
}
