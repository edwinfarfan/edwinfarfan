package pe.com.cd.service;

import pe.com.cd.domain.UsuarioRol;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing UsuarioRol.
 */
public interface UsuarioRolService {

    /**
     * Save a usuarioRol.
     *
     * @param usuarioRol the entity to save
     * @return the persisted entity
     */
    UsuarioRol save(UsuarioRol usuarioRol);

    /**
     * Get all the usuarioRols.
     *
     * @return the list of entities
     */
    List<UsuarioRol> findAll();


    /**
     * Get the "id" usuarioRol.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UsuarioRol> findOne(Long id);

    /**
     * Delete the "id" usuarioRol.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the usuarioRol corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<UsuarioRol> search(String query);
}
