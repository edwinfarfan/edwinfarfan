package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "_password")
    private String password;

    @Column(name = "pregunta_secreta")
    private String preguntaSecreta;

    @Column(name = "estado")
    private String estado;

    @Column(name = "tiempo_sesion", precision = 10, scale = 2)
    private BigDecimal tiempoSesion;

    @OneToOne
    @JoinColumn(unique = true)
    private Persona persona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public Usuario usuario(String usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public Usuario password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPreguntaSecreta() {
        return preguntaSecreta;
    }

    public Usuario preguntaSecreta(String preguntaSecreta) {
        this.preguntaSecreta = preguntaSecreta;
        return this;
    }

    public void setPreguntaSecreta(String preguntaSecreta) {
        this.preguntaSecreta = preguntaSecreta;
    }

    public String getEstado() {
        return estado;
    }

    public Usuario estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getTiempoSesion() {
        return tiempoSesion;
    }

    public Usuario tiempoSesion(BigDecimal tiempoSesion) {
        this.tiempoSesion = tiempoSesion;
        return this;
    }

    public void setTiempoSesion(BigDecimal tiempoSesion) {
        this.tiempoSesion = tiempoSesion;
    }

    public Persona getPersona() {
        return persona;
    }

    public Usuario persona(Persona persona) {
        this.persona = persona;
        return this;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", usuario='" + getUsuario() + "'" +
            ", password='" + getPassword() + "'" +
            ", preguntaSecreta='" + getPreguntaSecreta() + "'" +
            ", estado='" + getEstado() + "'" +
            ", tiempoSesion=" + getTiempoSesion() +
            "}";
    }
}
