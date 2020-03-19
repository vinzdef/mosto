<?php

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;

// check if class already exists
if( !class_exists('acf_field_image_mapping') ) :

class acf_field_image_mapping extends acf_field {
	function __construct( $settings ) {
		$this->name = 'image_mapping';
		$this->label = __('Image Mapping', 'acf-image_mapping');
		$this->category = 'basic';
		$this->defaults = array(
			'font_size'	=> 14,
			'x'	=> 0,
			'y'	=> 0,
		);
		$this->l10n = array(
			'error'	=> __('Error! Please enter click to create a coordinate pair', 'acf-image_mapping'),
		);
		$this->settings = $settings;
		parent::__construct();
	}

	function render_field_settings( $field ) {
		acf_render_field_setting( $field, array(
			'label'			=> __( 'Image Field Label', 'acf-image_mapping' ),
			'instructions'	=> __( 'Field label of image to link to', 'acf-image_mapping' ),
			'placeholder'   => __( 'ACF_IMAGE_FIELD_NAME', 'acf-image_mapping' ),
			'type'			=> 'text',
			'name'			=> 'image_field_label',
			'required'      => true
		));

		acf_render_field_setting( $field, array(
			'label'			=> __( 'Percentage Based Coordinates', 'acf-image_mapping' ),
			'instructions'	=> __( 'Convert the coordinate pair to percentages instead of the raw X / Y pair', 'acf-image_mapping' ),
			'type'			=> 'true_false',
			'name'			=> 'percent_based',
		));
	}

	function render_field( $field ) {
		$img_label     = esc_attr( $field['image_field_label'] );
		$field_name    = esc_attr( $field['name'] );
		$field_value   = esc_attr( $field['value'] );
		$percent_based = array_key_exists( 'percent_based', $field ) && $field['percent_based'] ? 1 : 0;
		$xy_pair       = explode( ',', $field_value );

		if ( 1 < count( $xy_pair ) ) {
			$x = $xy_pair[0];
			$y = $xy_pair[1];
		} else {
			$x = 0;
			$y = 0;
		}

		echo <<< HTML
			<!-- Image where we will catch the user's clicks -->
			<div class="$this->name-image">
				<img src="" data-percent-based="$percent_based" data-label="$img_label" />
				<span style="left:$x;top:$y;"></span>
			</div>

			<!-- XY Coordinate Pair -->
			<input class="$this->name-input" type="text" name="$field_name" value="$field_value" />
		HTML;
	}

	function format_value( $value ) {
		$string = explode(',', $value);
		return json_encode($string, JSON_FORCE_OBJECT);
	}

	function input_admin_enqueue_scripts() {
		// vars
		$url = $this->settings['url'];
		$version = $this->settings['version'];

		// register & include JS
		wp_register_script( 'acf-input-image_mapping', "{$url}assets/js/input.js", array('acf-input'), null );
		wp_enqueue_script('acf-input-image_mapping');

		// register & include CSS
		wp_register_style( 'acf-input-image_mapping', "{$url}assets/css/input.css", array('acf-input'), $version );
		wp_enqueue_style('acf-input-image_mapping');

	}
}

// initialize
new acf_field_image_mapping( $this->settings );

// class_exists check
endif;