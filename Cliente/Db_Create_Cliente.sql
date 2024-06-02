CREATE DATABASE Proyecto2Lenguajes
USE Proyecto2Lenguajes

CREATE TABLE Usuario
(
	idusuario INT IDENTITY
	, nombre NVARCHAR(MAX) NOT NULL
	, apellidos NVARCHAR(MAX) NOT NULL
	, cedula NVARCHAR(9) PRIMARY KEY NOT NULL
	, fechaNacimiento DATE NOT NULL
	, correo NVARCHAR(MAX) NOT NULL
	, contrasenna NVARCHAR(MAX) NOT NULL
)

INSERT INTO Usuario (nombre, apellidos, cedula, fechaNacimiento, correo, contrasenna)
VALUES
('Juan', 'Pérez', '12345678', '1990-01-01', 'juan.perez@example.com', '123'),
('Maria', 'González', '23456789', '1992-02-02', 'maria.gonzalez@example.com', '123'),
('Pedro', 'Martínez', '34567890', '1995-03-03', 'pedro.martinez@example.com', '123'),
('Ana', 'Rodríguez', '45678901', '1998-04-04', 'ana.rodriguez@example.com', '123'),
('Luis', 'Hernández', '56789012', '2000-05-05', 'luis.hernandez@example.com', '123');

SELECT * FROM Usuario


CREATE TABLE Compra
(
    idCompra INT NOT NULL,
    cedula NVARCHAR(9) NOT NULL,
    precioTotal DECIMAL(18, 2) NOT NULL,
    descuentoFinal DECIMAL(18, 2) NOT NULL,
    tarjeta NVARCHAR(MAX) NOT NULL,
    CONSTRAINT PK_Compra PRIMARY KEY (idCompra),
    CONSTRAINT FK_Compra_Usuario FOREIGN KEY (cedula) REFERENCES Usuario(cedula)
);

CREATE TABLE DatosCupon
(
    idCupon INT NOT NULL,
    idCompra INT NOT NULL,
    precio DECIMAL(18, 2) NOT NULL,
    descuento DECIMAL(18, 2) NOT NULL,
    imagenRepresentativa NVARCHAR(MAX) NOT NULL,
    ubicacion NVARCHAR(MAX) NOT NULL,
    empresa NVARCHAR(MAX) NOT NULL,
    cantidad INT NOT NULL,
    CONSTRAINT PK_DatosCupon PRIMARY KEY (idCupon, idCompra),
    CONSTRAINT FK_DatosCupon_Compra FOREIGN KEY (idCompra) REFERENCES Compra(idCompra)
);
