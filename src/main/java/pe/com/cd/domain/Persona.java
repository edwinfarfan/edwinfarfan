package pe.com.cd.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import pe.com.cd.domain.enumeration.TipoPersona;

import pe.com.cd.domain.enumeration.Genero;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_persona")
    private TipoPersona tipoPersona;

    @Column(name = "razon_social")
    private String razonSocial;

    @Column(name = "numero_documento")
    private String numeroDocumento;

    @Column(name = "correo")
    private String correo;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Enumerated(EnumType.STRING)
    @Column(name = "genero")
    private Genero genero;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private TipoDocumento tipoDocumento;

    @OneToMany(mappedBy = "persona")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<DireccionPersona> direccions = new HashSet<>();
    @OneToMany(mappedBy = "persona")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TelefonoPersona> telefonos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Persona nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Persona apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public TipoPersona getTipoPersona() {
        return tipoPersona;
    }

    public Persona tipoPersona(TipoPersona tipoPersona) {
        this.tipoPersona = tipoPersona;
        return this;
    }

    public void setTipoPersona(TipoPersona tipoPersona) {
        this.tipoPersona = tipoPersona;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public Persona razonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
        return this;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public Persona numeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
        return this;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getCorreo() {
        return correo;
    }

    public Persona correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public Persona fechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Genero getGenero() {
        return genero;
    }

    public Persona genero(Genero genero) {
        this.genero = genero;
        return this;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public String getEstado() {
        return estado;
    }

    public Persona estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public Persona tipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
        return this;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public Set<DireccionPersona> getDireccions() {
        return direccions;
    }

    public Persona direccions(Set<DireccionPersona> direccionPersonas) {
        this.direccions = direccionPersonas;
        return this;
    }

    public Persona addDireccion(DireccionPersona direccionPersona) {
        this.direccions.add(direccionPersona);
        direccionPersona.setPersona(this);
        return this;
    }

    public Persona removeDireccion(DireccionPersona direccionPersona) {
        this.direccions.remove(direccionPersona);
        direccionPersona.setPersona(null);
        return this;
    }

    public void setDireccions(Set<DireccionPersona> direccionPersonas) {
        this.direccions = direccionPersonas;
    }

    public Set<TelefonoPersona> getTelefonos() {
        return telefonos;
    }

    public Persona telefonos(Set<TelefonoPersona> telefonoPersonas) {
        this.telefonos = telefonoPersonas;
        return this;
    }

    public Persona addTelefonos(TelefonoPersona telefonoPersona) {
        this.telefonos.add(telefonoPersona);
        telefonoPersona.setPersona(this);
        return this;
    }

    public Persona removeTelefonos(TelefonoPersona telefonoPersona) {
        this.telefonos.remove(telefonoPersona);
        telefonoPersona.setPersona(null);
        return this;
    }

    public void setTelefonos(Set<TelefonoPersona> telefonoPersonas) {
        this.telefonos = telefonoPersonas;
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
        Persona persona = (Persona) o;
        if (persona.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persona.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", tipoPersona='" + getTipoPersona() + "'" +
            ", razonSocial='" + getRazonSocial() + "'" +
            ", numeroDocumento='" + getNumeroDocumento() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", genero='" + getGenero() + "'" +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
